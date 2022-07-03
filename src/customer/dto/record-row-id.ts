import { IsNumberString } from 'class-validator';

export class RecordRowId {
  @IsNumberString()
  id: number;
}
