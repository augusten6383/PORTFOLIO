from django.core.management.base import BaseCommand
from portfolio.models import Service

class Command(BaseCommand):
    help = "this command deletes service data"

    def handle(self, *args, **options):
        Service.objects.all().delete()
        self.stdout.write(self.style.SUCCESS("Data deleted successfully"))