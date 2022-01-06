import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiPropertyOptional({ description: '아이디' })
    id: number;

    @ApiPropertyOptional({ description: '이름' })
    name: string;

    @ApiPropertyOptional({ description: '주소' })
    address: string;
}
