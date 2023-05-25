import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException) // Catch 데코레이터
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException) {
    const status = exception.getStatus(); // 예외코드
    const message = exception.message; // 예외메세지

    console.log('======================');
    console.log('예외가 발생했습니다.');
    console.log('예외내용', message);
    console.log('예외코드', status);
    console.log('======================');
  }
}
