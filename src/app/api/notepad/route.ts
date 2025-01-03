import {DynamoDBClient, GetItemCommand, PutItemCommand} from "@aws-sdk/client-dynamodb";
import {NextRequest, NextResponse} from "next/server";
import {getServerSession} from "next-auth";

const UNAUTHORIZED = NextResponse.json({error: 'Unauthorized'}, {status: 401});

const getNote = async function () {
    const session = await getServerSession();
    if (!session || !session.user || !session.user.email) {
        return UNAUTHORIZED;
    }
    
    const dynamoDBClient = new DynamoDBClient();
    
    const input = {
        Key: {
            user_id: {
                "S": session.user.email
            }
        },
        "TableName": process.env.NOTEPAD_TABLE_NAME
    };
    const command = new GetItemCommand(input);
    const response = await dynamoDBClient.send(command);
    
    if (!response.Item) {
        return NextResponse.json({content: ""});
    }
    
    return NextResponse.json({content: response.Item.Content.S});
}

const updateNote = async function (request: NextRequest) {
    const session = await getServerSession();
    if (!session || !session.user || !session.user.email) {
        return UNAUTHORIZED;
    }
    
    const data = await request.json();
    const content = data.content;
    
    const dynamoDBClient = new DynamoDBClient();
    
    const input = {
        Item: {
            user_id: {
                "S": session.user.email
            },
            "Content": {
                "S": content
            },
        },
        "TableName": process.env.NOTEPAD_TABLE_NAME
    };
    const command = new PutItemCommand(input);
    await dynamoDBClient.send(command);
    
    return NextResponse.json("hello")
}

export {
    updateNote as POST,
    getNote as GET
};