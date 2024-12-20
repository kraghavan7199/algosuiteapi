import { Container } from 'inversify';
import { Database } from './src/config/Database';
import { UserRepository } from './src/infrastructure/UsersRepository';
import { IUserRepository } from './src/domain/IUserRepository';
import { IAuthService } from './src/domain/services/IAuthService';
import { AuthService } from './src/domain/services/AuthService';
import { AuthMiddleware } from './src/config/AuthGuard';
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
import { RegisterUser } from './src/application/Auth/RegisterUser';
import { LoginUser } from './src/application/Auth/LoginUser';
import { GetStringSuggestions } from './src/application/String/GetStringSuggestions';
import { GenerateBinaryTree } from './src/application/BinaryTree/GenerateBinaryTree';
import { AdminRegister } from './src/application/AdminAuth/AdminRegister';
import { AdminLogin } from './src/application/AdminAuth/AdminLogin';
import { AdminAuthMiddleware } from './src/config/AdminAuthGuard';
import { GetAdminData } from './src/application/Admin/GetAdminData';
import { GetAllUsers } from './src/application/Admin/GetAllUsers';
import { ChangeUserBlockStatus } from './src/application/Admin/BlockUser';

const container = new Container();

 // Config Binding

container.bind(Database).toSelf().inSingletonScope();
container.bind<AuthMiddleware>('authMiddleware').to(AuthMiddleware);
container.bind<AdminAuthMiddleware>('adminAuthMiddleware').to(AdminAuthMiddleware);

//Feature Binding

container.bind<LoginUser>('loginUser').to(LoginUser);
container.bind<RegisterUser>('registerUser').to(RegisterUser);
container.bind<GetUserById>('getUserById').to(GetUserById);
container.bind<GetUserStringsHistory>('getUserStringsHistory').to(GetUserStringsHistory);
container.bind<GetUserTree>('getUserTree').to(GetUserTree);
container.bind<SaveBinaryTree>('saveBinaryTree').to(SaveBinaryTree);
container.bind<GetBinaryTreeCalculations>('getBinaryTreeCalculations').to(GetBinaryTreeCalculations);
container.bind<PerformSubstringCalculations>('performSubstringCalculations').to(PerformSubstringCalculations);
container.bind<GetStringSuggestions>('getStringSuggestions').to(GetStringSuggestions);
container.bind<GenerateBinaryTree>('generateBinaryTree').to(GenerateBinaryTree);
container.bind<AdminRegister>('adminRegister').to(AdminRegister);
container.bind<AdminLogin>('adminLogin').to(AdminLogin);
container.bind<GetAdminData>('getAdminData').to(GetAdminData);
container.bind<GetAllUsers>('getAllUsers').to(GetAllUsers);
container.bind<ChangeUserBlockStatus>('changeUserBlockStatus').to(ChangeUserBlockStatus);


//Service Binding

container.bind<IStringService>('stringService').to(StringService);
container.bind<ITreeService>('treeService').to(TreeService);
container.bind<IAuthService>('authService').to(AuthService);


//Repo Binding

container.bind<IUserRepository>('userRepo').to(UserRepository);
container.bind<ITreeRepository>('treeRepo').to(TreeRepository);
container.bind<IStringRepository>('stringRepository').to(StringRepository);


export{ container }