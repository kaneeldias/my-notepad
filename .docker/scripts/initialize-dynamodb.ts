import {
    CreateTableCommand,
    CreateTableCommandInput,
    DeleteTableCommand,
    DeleteTableInput,
    DynamoDBClient
} from "@aws-sdk/client-dynamodb";

const dynamoDBClient = new DynamoDBClient({
    region: "local",
    endpoint: process.env.DYNAMODB_ENDPOINT || "http://dynamodb-local:8000",
    credentials: {
        accessKeyId: "fake",
        secretAccessKey: "fake"
    }
});

async function initialize() {
    const deleteTable: DeleteTableInput = {
        TableName: process.env.NOTEPAD_TABLE_NAME || "test"
    }
    try {
        await dynamoDBClient.send(new DeleteTableCommand(deleteTable));
    } catch (e: unknown) {
        if (e instanceof Error && e.name !== "ResourceNotFoundException") {
            throw e;
        }
    }
    
    const params: CreateTableCommandInput = {
        AttributeDefinitions: [
            {
                AttributeName: "user_id",
                AttributeType: "S"
            }
        ],
        KeySchema: [
            {
                AttributeName: "user_id",
                KeyType: "HASH"
            }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
        },
        TableName: process.env.NOTEPAD_TABLE_NAME || "test"
    };
    await dynamoDBClient.send(new CreateTableCommand(params));
    console.log("Table created");
    process.exit(0);
}

initialize();