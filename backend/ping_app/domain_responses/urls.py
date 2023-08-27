from django.urls import path
from domain_responses.views import DomainResponseListView

urlpatterns = [
    path("", DomainResponseListView.as_view()),
]
