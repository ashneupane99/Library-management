
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export const CustomCard = ({id, title, Name, year, url}) => {
  return (
    <Link to={`/book/${id}`}className="nav-link">
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={url} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          <p>
            {Name}- {year}
          </p>
        </Card.Text>
       
      </Card.Body>
    </Card>
    </Link>
  );
};