import json
import os
import boto3

dynamodb = boto3.resource("dynamodb", region_name=os.environ.get("AWS_REGION", "us-east-1"))
table = dynamodb.Table("cloud-resume-visitors")


def lambda_handler(event, context):
    # Increment the visitor count atomically
    response = table.update_item(
        Key={"id": "visitor_count"},
        UpdateExpression="ADD visit_count :inc",
        ExpressionAttributeValues={":inc": 1},
        ReturnValues="UPDATED_NEW",
    )

    count = int(response["Attributes"]["visit_count"])

    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type",
        },
        "body": json.dumps({"visitor_count": count}),
    }
