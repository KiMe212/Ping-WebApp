from domain_responses.models import Domain
from domain_responses.serializers import DomainResponseSerializer
from rest_framework.generics import ListAPIView


class DomainResponseListView(ListAPIView):
    serializer_class = DomainResponseSerializer
    queryset = Domain.objects.prefetch_related("domain_responses").order_by("name")
