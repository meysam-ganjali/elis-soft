from django.contrib import admin
from .models import Froum, Question, Answer
from django.db.models.aggregates import Count


@admin.register(Froum)
class FroumAdmin(admin.ModelAdmin):
    list_display = ('froum_name', 'forum_logo', 'alt', 'title', 'count_q_of_forum')
    readonly_fields = ('forum_logo',)

    # اضافه کردن فیلد به جدول
    def get_queryset(self, *args, **kwargs):
        qs = super(FroumAdmin, self).get_queryset(*args, **kwargs)
        qs = qs.annotate(q_count=Count('question_froum'))
        return qs

    def count_q_of_forum(self, obj):
        return obj.q_count

    count_q_of_forum.short_description = 'تعداد سوال ها'


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('q',)


@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    pass
