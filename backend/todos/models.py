from django.db import models
from django.utils import timezone
from datetime import time

class Todo(models.Model):
    CATEGORY_CHOICES = [
        ('work', 'Work'),
        ('personal', 'Personal'),
        ('health', 'Health'),
        ('education', 'Education'),
        ('finance', 'Finance'),
        ('social', 'Social'),
        ('travel', 'Travel'),
        ('shopping', 'Shopping'),
        ('others', 'Others'),
    ]
    
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='work')
    date = models.DateField(default=timezone.now)  
    timeStart = models.TimeField(default=time(9, 0))  
    timeEnd = models.TimeField(default=time(10, 0))   
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['date', 'timeStart']

    def __str__(self):
        return f"{self.title} - {self.date} {self.timeStart}"