import json
from unittest.mock import patch, MagicMock
import lambda_function


@patch("lambda_function.table")
def test_lambda_returns_count(mock_table):
    """Test that the Lambda returns a visitor count with correct format."""
    mock_table.update_item.return_value = {
        "Attributes": {"visit_count": 42}
    }

    result = lambda_function.lambda_handler({}, None)

    assert result["statusCode"] == 200
    assert "Access-Control-Allow-Origin" in result["headers"]

    body = json.loads(result["body"])
    assert body["visitor_count"] == 42


@patch("lambda_function.table")
def test_lambda_increments_count(mock_table):
    """Test that the Lambda calls DynamoDB with correct update expression."""
    mock_table.update_item.return_value = {
        "Attributes": {"visit_count": 1}
    }

    lambda_function.lambda_handler({}, None)

    mock_table.update_item.assert_called_once_with(
        Key={"id": "visitor_count"},
        UpdateExpression="ADD visit_count :inc",
        ExpressionAttributeValues={":inc": 1},
        ReturnValues="UPDATED_NEW",
    )
