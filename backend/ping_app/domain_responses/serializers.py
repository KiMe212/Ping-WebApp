import logging
from datetime import date

from domain_responses.models import Domain
from rest_framework import serializers

logger = logging.getLogger(__name__)


class DomainResponseSerializer(serializers.ModelSerializer):
    response_times = serializers.SerializerMethodField()

    class Meta:
        model = Domain
        fields = ("id", "name", "url", "response_times")

    def get_response_times(self, obj):
        """
        Returns averaged response time for every 10 minutes
        """

        domain_responses = obj.domain_responses.filter(created_at__date=date.today())
        logger.info("Retrieved %s responses for %s", len(domain_responses), obj.url)

        response_times = {}

        for domain_response in domain_responses:
            created_at = domain_response.created_at
            rounded_minute = (created_at.minute // 10) * 10
            key = created_at.replace(minute=rounded_minute).strftime("%H:%M")

            response_times.setdefault(key, []).append(domain_response.response_time)

        result_dict = {}
        for hour in range(24):
            for minute in range(0, 60, 10):
                time_str = f"{hour:02d}:{minute:02d}"
                if data := response_times.get(time_str):
                    result_dict[time_str] = sum(data) / len(data)
                else:
                    result_dict[time_str] = None

        return result_dict
