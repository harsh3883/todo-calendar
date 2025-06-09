from django.contrib import admin
from .models import Todo

@admin.register(Todo)
class TodoAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'date', 'timeStart', 'timeEnd', 'completed']
    list_filter = ['category', 'completed', 'date']
    search_fields = ['title', 'description']
    ordering = ['date', 'timeStart']