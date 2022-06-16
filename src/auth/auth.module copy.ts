import { ConfigModule } from '@nestjs/config';
import { KeycloakConfigService } from './auth.service';
import {
  KeycloakConnectModule,
  PolicyEnforcementMode,
  TokenValidation,
} from 'nest-keycloak-connect';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    KeycloakConnectModule.register({
      authServerUrl: 'http://localhost:8080/auth',
      realm: 'master',
      clientId: 'my-nestjs-app',
      secret: 'secret',
      policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
      tokenValidation: TokenValidation.ONLINE,
    }),

    KeycloakConnectModule.registerAsync({
      useExisting: KeycloakConfigService,
      imports: [ConfigModule],
    }),
  ],
  providers: [KeycloakConfigService],
  exports: [KeycloakConnectModule],
})
export class AuthModule {}
