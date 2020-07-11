import 'jest';

import { Container, createTestBed } from '@gapi/core';

import { DatabaseService } from './database.service';

describe('Database Service', () => {
  beforeAll(async () => {
    await createTestBed({
      imports: [],
      providers: [DatabaseService],
    }).toPromise();
  });

  it('should be defined', done => {
    expect(Container.has(DatabaseService)).toBeTruthy();
    done();
  });
});
