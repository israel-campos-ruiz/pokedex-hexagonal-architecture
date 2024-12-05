import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
export function ApiOKResponseSwagger(description: string, type: any) {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description,
      type,
    }),
  );
}
