import concurrent.futures
import importlib
import logging
import time
from datetime import datetime

import ping_app.settings
from domain_responses.models import Domain, DomainResponse
from ping3 import ping

logger = logging.getLogger(__name__)


def ping_domains() -> None:
    domains: list[str] = Domain.objects.values_list("url", flat=True)

    if not domains:
        logger.info("No domains in database. Sleeping for 10 seconds")
        time.sleep(10)
        return

    num_of_workers = len(domains)
    if num_of_workers == 1:
        logger.info("Single-thread processing (Only one domain found)")
        ping_sweep(domain_url=domains[0])
    else:
        with concurrent.futures.ThreadPoolExecutor(
            max_workers=num_of_workers
        ) as executor:
            logger.info("Multi-thread processing with %s workers.", num_of_workers)
            executor.map(ping_sweep, domains)

    logger.info(
        "Reloading settings module to retrieve up to date time between ping operations"
    )

    importlib.reload(ping_app.settings)

    from ping_app.settings import TIME_BETWEEN_PING_ITERATIONS

    logger.info("Sleeping for %s seconds", TIME_BETWEEN_PING_ITERATIONS)

    time.sleep(TIME_BETWEEN_PING_ITERATIONS)


def ping_sweep(domain_url: str) -> float | None:
    timestamp = datetime.now().isoformat(sep=" ", timespec="seconds")
    try:
        response_time = ping(domain_url, timeout=1, unit="ms")
        if response_time:  # can be False and None
            logging.info(
                "%s - %s is reachable in %s ms",
                timestamp,
                domain_url,
                round(response_time, 2),
            )
            domain = Domain.objects.get(url=domain_url)

            logger.info("Write response from '%s' to the database", domain_url)
            DomainResponse.objects.create(
                domain=domain,
                response_time=response_time,
            )
        else:
            logging.error("%s - %s is unreachable", timestamp, domain_url)
    except Exception:
        logging.exception("%s - Error pinging %s", timestamp, domain_url)
