from django.db import models
from account.models import CustomerUser


class FroumCategory(models.Model):
    name = models.CharField(max_length=350, verbose_name='عنوان دسته بندی')

    class Meta:
        verbose_name = 'دسته بندی انجمن'
        verbose_name_plural = 'دسته های انجمن'

    def __str__(self):
        return self.name


class Froum(models.Model):
    froum_name = models.CharField(max_length=350, verbose_name='نام انجمن')
    category = models.ForeignKey(FroumCategory, on_delete=models.CASCADE, verbose_name='', related_name='froum_cat')

    class Meta:
        verbose_name = 'انجمن'
        verbose_name_plural = 'انجمن ها'

    def __str__(self):
        return self.froum_name


class Question(models.Model):
    q = models.TextField(verbose_name='سوال')
    title = models.CharField(max_length=1000, verbose_name='عنوان سوال')
    is_active = models.BooleanField(default=False, verbose_name='تاید / عدم تایید')
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
    question = models.ForeignKey(Question, on_delete=models.PROTECT, related_name='question_answer',
                                 verbose_name='سوال')

    class Meta:
        verbose_name = 'جواب'
        verbose_name_plural = 'جواب ها'

    def __str__(self):
        return self.answer
