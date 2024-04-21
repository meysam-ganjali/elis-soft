import requests

from django.shortcuts import render
from django.views import View
from django.conf import settings
from account.forms import CounselingForm
from account.models import Counseling
from django.contrib import messages


def media_url(request):
    return {'media_url': settings.MEDIA_URL}


class IndexView(View):
    def get(self, request):
        counseling_form = CounselingForm()
        return render(request, 'index/index.html', {
            'counseling_form': counseling_form,
            'user': request.user
        })

    def post(self, request):
        counseling_form = CounselingForm(request.POST)
        if counseling_form.is_valid():
            name = counseling_form.cleaned_data['name']
            phone = counseling_form.cleaned_data['phone']
            counseling_new = Counseling.objects.create(name=name, phone=phone)
            data = {'bodyId': 210088, 'to': '09033310515', 'args': [str(counseling_new.name), str(counseling_new.phone)]}
            response = requests.post('https://console.melipayamak.com/api/send/shared/f6e8bf7a927d4042abcb988afd893a58',
                                     json=data)
            messages.success(request, 'اطلاعات شما با موفقیت ثبت شد. منتظر تماس با مشاوران ما باشید')
            return render(request, 'index/index.html', {
                'counseling_form': counseling_form,
            })

        messages.error(request, 'اطلاعات ارسالی نامعتب میباشد. مقداری معتبر وارد کنید')
        return render(request, 'index/index.html', {
            'counseling_form': counseling_form
        })
