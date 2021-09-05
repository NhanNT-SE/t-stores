import { Publisher, Subjects, UserCreatedEvent } from '@tstores/common';

export class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
  readonly subject = Subjects.UserCreated;
}
