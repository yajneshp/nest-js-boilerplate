class UserAccount {
  name: string;
  id: number;

  constructor(name, id) {
    this.name = name;
    this.id = id;
  }
}

const user = new UserAccount('Test', 10);

type windowState = 'Open' | 'Closed' | 'Minimized';
