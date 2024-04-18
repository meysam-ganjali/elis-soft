from django.shortcuts import render
from django.views import View


class ForumView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'froum/forum.html')
