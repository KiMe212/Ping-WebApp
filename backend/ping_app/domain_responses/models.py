from django.db import models


class Domain(models.Model):
    name = models.CharField(max_length=150, blank=True)
    url = models.CharField(unique=True)

    def __str__(self):
        return f"{self.name} - {self.url}"


class DomainResponse(models.Model):
    domain = models.ForeignKey(
        Domain, on_delete=models.CASCADE, related_name="domain_responses"
    )
    response_time = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Response time for `{self.domain.url}` at \
            {self.created_at.isoformat(sep=' ', timespec='seconds')} was {self.response_time:.2f} ms"
