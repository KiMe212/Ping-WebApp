from django.core.management.base import BaseCommand
from services.scan import ping_domains


class Command(BaseCommand):
    help = "Run multi-threaded application"

    def handle(self, *args, **options):
        while True:
            ping_domains()
