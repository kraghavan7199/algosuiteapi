import { Container } from 'inversify';
import { Database } from './src/config/Database';
import { UserRepository } from './src/infrastructure/UsersRepository';
import { IUserRepository } from './src/domain/IUserRepository';
import { IAuthService } from './src/domain/services/IAuthService';
import { AuthService } from './src/domain/services/AuthService';
import { LoginUser } from './src/application/LoginUser';
import { AuthMiddleware } from './src/config/AuthGuard';
import { RegisterUser } from './src/application/RegisterUser';
import { IStringService } from './src/domain/services/IStringService';
import { StringService } from './src/domain/services/StringService';
import { PerformSubstringCalculations } from './src/application/String/PerformSubstringAlgorithms';
import { IStringRepository } from './src/domain/IStringRepository';
import { StringRepository } from './src/infrastructure/StringRepository';
import { ITreeRepository } from './src/domain/ITreeRepository';
import { TreeRepository } from './src/infrastructure/TreeRepository';
import { ITreeService } from './src/domain/services/ITreeService';
import { TreeService } from './src/domain/services/TreeService';
import { SaveBinaryTree } from './src/application/BinaryTree/SaveBinaryTree';
import { GetBinaryTreeCalculations } from './src/application/BinaryTree/GetBinaryTreeCalculations';
import { GetUserById } from './src/application/Users/GetUserById';
import { GetUserStringsHistory } from './src/application/String/GetUserStringsHistory';
import { GetUserTree } from './src/application/BinaryTree/GetUserTree';

const container = new Container();

container.bind(Database).toSelf().inSingletonScope();

container.bind<IUserRepository>('userRepo').to(UserRepository);
container.bind<IAuthService>('authService').to(AuthService);
container.bind<LoginUser>('loginUser').to(LoginUser);
container.bind<RegisterUser>('registerUser').to(RegisterUser);
container.bind<AuthMiddleware>('authMiddleware').to(AuthMiddleware);
container.bind<IStringService>('stringService').to(StringService);
container.bind<PerformSubstringCalculations>('performSubstringCalculations').to(PerformSubstringCalculations);
container.bind<IStringRepository>('stringRepository').to(StringRepository);
container.bind<ITreeRepository>('treeRepo').to(TreeRepository);
container.bind<ITreeService>('treeService').to(TreeService);
container.bind<SaveBinaryTree>('saveBinaryTree').to(SaveBinaryTree);
container.bind<GetBinaryTreeCalculations>('getBinaryTreeCalculations').to(GetBinaryTreeCalculations);

container.bind<GetUserById>('getUserById').to(GetUserById);
container.bind<GetUserStringsHistory>('getUserStringsHistory').to(GetUserStringsHistory);
container.bind<GetUserTree>('getUserTree').to(GetUserTree);

export{ container }