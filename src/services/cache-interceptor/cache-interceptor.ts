import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpSentEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncSubject } from 'rxjs/';
import { tap } from 'rxjs/operators';

/**
 * Перехватчик запросов приложения для кэширования ответов
 */
@Injectable()
export class CacheInterceptor implements HttpInterceptor {

    /**Кэш */
    private cache: { [name: string]: AsyncSubject<HttpEvent<HttpSentEvent>> } = {};

    /**
     * Перехват HTTP запросов
     * @param request Запрос 
     * @param next Обработчик запроса
     */
    intercept(request: HttpRequest<HttpSentEvent>, next: HttpHandler) : Observable<HttpEvent<HttpSentEvent>> {
        
        if (request.method !== 'GET') {
            return next.handle(request);
        }
        
        const cachedResponse = this.cache[request.urlWithParams] || null;

        if (cachedResponse && request.params.get('forceUpdate') !== 'true') {
            return cachedResponse;
        }
        
        const subject = this.cache[request.urlWithParams] = new AsyncSubject<HttpEvent<HttpSentEvent>>();
        
        next.handle(request).pipe(tap(
            (event: HttpEvent<HttpSentEvent>) => {
                if (event instanceof HttpResponse) {
                    subject.next(event);
                    subject.complete();
                }
            })).subscribe();
     
        return subject;
    }
}