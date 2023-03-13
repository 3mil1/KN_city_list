import { DataSource } from 'typeorm';
import ormconfig from '@app/configs/ormconfig';

export default new DataSource(ormconfig);
