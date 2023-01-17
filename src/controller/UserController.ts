import { Request } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  async all() {
    return this.userRepository.find();
  }

  async one(request: Request) {
    const id = parseInt(request.params.id, 10);

    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      return 'unregistered user';
    }
    return user;
  }

  async save(request: Request) {
    const { firstName, lastName, age } = request.body;

    const user = Object.assign(new User(), {
      firstName,
      lastName,
      age,
    });

    return this.userRepository.save(user);
  }

  async remove(request: Request) {
    const id = parseInt(request.params.id, 10);

    const userToRemove = await this.userRepository.findOneBy({ id });

    if (!userToRemove) {
      return 'this user not exist';
    }

    await this.userRepository.remove(userToRemove);

    return 'user has been removed';
  }
}
