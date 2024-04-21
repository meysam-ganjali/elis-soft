from django.db import models
from account.models import CustomerUser
from ckeditor.fields import RichTextFormField
from ckeditor_uploader.fields import RichTextUploadingField
from django.utils.html import mark_safe
from django_jalali.db import models as jmodels
import jdatetime


class Froum(models.Model):
    froum_name = models.CharField(max_length=350, verbose_name='نام انجمن')
    logo = models.ImageField(upload_to='froum_logo', verbose_name='لوگوی انجمن')
    alt = models.CharField(max_length=50, verbose_name='متن جایگزین لوگو')
    title = models.CharField(max_length=75, verbose_name='عنوان لوگو')

    class Meta:
        verbose_name = 'انجمن'
        verbose_name_plural = 'انجمن ها'

    def __str__(self):
        return self.froum_name

    def forum_logo(self):
        return mark_safe('<img src="/media/%s" width="70" height="70" />' % (self.logo))

    forum_logo.short_description = 'لوگو'
    forum_logo.allow_tags = True


class Question(models.Model):
    q = RichTextUploadingField(config_name='special', verbose_name='سوال')
    title = models.CharField(max_length=1000, verbose_name='عنوان سوال')
    is_active = models.BooleanField(default=False, verbose_name='تاید / عدم تایید')
    register_date = jmodels.jDateField(default=jdatetime.date.today(), verbose_name='تاریخ ساخت')
    user = models.ForeignKey(CustomerUser, on_delete=models.PROTECT, verbose_name='کاربر', related_name='question_user')
    froum = models.ForeignKey(Froum, on_delete=models.CASCADE, related_name='question_froum', verbose_name='انجمن')

    class Meta:
        verbose_name = 'سوال'
        verbose_name_plural = 'سوال ها'

    def __str__(self):
        return self.q


class Answer(models.Model):
    answer = models.TextField(verbose_name='جواب')
    is_active = models.BooleanField(default=False, verbose_name='تاید / عدم تایید')
    user = models.ForeignKey(CustomerUser, on_delete=models.PROTECT, verbose_name='کاربر', related_name='user_answer')
    register_date = jmodels.jDateField(default=jdatetime.date.today(), verbose_name='تاریخ ساخت')
    question = models.ForeignKey(Question, on_delete=models.PROTECT, related_name='question_answer',
                                 verbose_name='سوال')

    class Meta:
        verbose_name = 'جواب'
        verbose_name_plural = 'جواب ها'

    def __str__(self):
        return self.answer
