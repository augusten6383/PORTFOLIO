from portfolio.models import service
from django.core.management.base import BaseCommand
from typing import Any


    
class Command(BaseCommand):
    help = "this command insert service data"
    def handle(self, *args: Any, **options: Any):
        title = [
            'Blog website', 'E-Commerce website', 'Portfolio website', 'Business website', 'Landing page', 'Educational Websites'
        ]
        about =[
            'Your blog page will be designed to captivate your audience and showcase your expertise. I\'ll optimize it for search engines to ensure maximum visibility. The content will be engaging, informative, and visually appealing, using high-quality images and graphics. Your brand identity will be seamlessly integrated throughout the page, creating a cohesive and professional experience for your readers.',
            ' I will design your online store to showcase your products, provide a seamless shopping experience, and encourage conversions. I\'ll optimize it for search engines to attract potential customers and integrate secure payment gateways for a hassle-free checkout process.',
            'I will showcase your work in a visually appealing and professional manner. I\'ll create a custom design that highlights your skills and experience, making it easy for clients to navigate and find relevant information.',
            ' I will design your website to serve as your digital storefront, providing essential information about your business, services, and contact details. I\'ll ensure it\'s user-friendly, visually appealing, and optimized for search engines to drive traffic and generate leads.',
            'I will design this dedicated page to focus on a specific goal, such as promoting a product, service, or event. I\'ll create a design that captures attention, provides clear calls to action, and converts visitors into leads or customers.',
            'I will design your online learning platform to deliver engaging and informative content. I\'ll focus on creating a user-friendly interface, organizing courses effectively, and incorporating interactive elements to enhance the learning experience.',
        ]
        pricing = [
            '$500-$1000', ' $350 - $700',  '$200 - $450', '$280 - $550', ' $140 - $280', '$420 - $700'
        ]
        for title, about, pricing in zip(title, about, pricing):
            service.objects.create(title=title, about=about, pricing=pricing)
            
        self.stdout.write(self.style.SUCCESS("completed"))
        