import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { join } from 'path';
import { GenericTable } from './GenericTables';

export class SpaceStack extends Stack {
  private api = new RestApi(this, 'SpaceApi');

  private spacesTable = new GenericTable(this, {
    tableName: 'SpacesTable',
    primaryKey: 'spaceId',
    createLambdaPath: 'Create',
    readLambdaPath: 'Read',
  });
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const helloLamdaNodeJs = new NodejsFunction(this, 'helloLambdaNodeJs', {
      entry: join(__dirname, '..', 'services', 'node-lambda', 'hello.ts'),
      handler: 'handler',
      functionName: 'helloLambdaNodeJs',
    });

    const s3ListPolicy = new PolicyStatement();
    s3ListPolicy.addActions('s3:ListAllMyBuckets');
    s3ListPolicy.addResources('*');
    helloLamdaNodeJs.addToRolePolicy(s3ListPolicy);

    // Hello Api lambda integration
    const helloLambdaIntegration = new LambdaIntegration(helloLamdaNodeJs);
    const helloLambdaResource = this.api.root.addResource('hello');
    helloLambdaResource.addMethod('Get', helloLambdaIntegration);

    //Spaces API integrations
    const spaceResource = this.api.root.addResource('spaces');
    spaceResource.addMethod('POST', this.spacesTable.createLambdaIntegration);
    spaceResource.addMethod('GET', this.spacesTable.readLambdaIntegration);
  }
}
