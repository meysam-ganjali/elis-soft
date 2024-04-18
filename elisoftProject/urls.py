from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
                  path('admin/', admin.site.urls),
                  path('', include('main.urls', namespace='main')),
                  path('auth/', include('account.urls', namespace='account')),
                  path('forum/', include('froum.urls', namespace='forum')),
              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

admin.site.site_header = 'پنل مدیریت الی سافت'
