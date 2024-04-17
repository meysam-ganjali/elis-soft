from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views import View
from django.conf import settings
from account.forms import CounselingForm
from account.models import Counseling


def media_url(request):
    return {'media_url': settings.MEDIA_URL}


class IndexView(View):
    def get(self, request):
        counseling_form = CounselingForm()
        return render(request, 'index/index.html', {
            'counseling_form': counseling_form
        })

    def post(self, request):
        counseling_form = CounselingForm(request.POST)
        if counseling_form.is_valid():
            name = counseling_form.cleaned_data['name']
            phone = counseling_form.cleaned_data['phone']
            Counseling.objects.create(name=name, phone=phone)
            return JsonResponse({'message': 'اطلاعات شما با موفقیت ثبت شد. منتظر تماس مشاوران ما باشید.'})
        else:
            return JsonResponse({'message': 'اطلاعات ارسالی معتبر نیست. لطفا مقادیر معتبر وارد کنید'})
