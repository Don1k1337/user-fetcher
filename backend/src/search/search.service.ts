import { Injectable } from '@nestjs/common';
import { promisify } from 'util';

const users = [
  { email: 'jim@gmail.com', number: '221122' },
  { email: 'jam@gmail.com', number: '830347' },
  { email: 'john@gmail.com', number: '221122' },
  { email: 'jams@gmail.com', number: '349425' },
  { email: 'jams@gmail.com', number: '141424' },
  { email: 'jill@gmail.com', number: '822287' },
  { email: 'jill@gmail.com', number: '822286' },
];

const delay = promisify(setTimeout);

@Injectable()
export class SearchService {
  private currentRequest: Promise<any> | null = null;

  async findUsers(email: string, number?: string) {
    if (this.currentRequest) this.currentRequest = null;

    this.currentRequest = (async () => {
      await delay(5000);
      const filteredUsers = users.filter(
        (user) =>
          user.email === email && (number ? user.number === number : true),
      );
      return { users: filteredUsers };
    })();

    return this.currentRequest;
  }
}
