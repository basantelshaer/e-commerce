import { faStar as solidStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Rating({ value }: { value: number }) {

  function getStarIcon(position: number) {
    if (value >= position) {
      return solidStar;
    }

    else if (value >= position - 0.5) {
      return faStarHalfStroke;
    }
else{
  return regularStar
}
  }

  return (
    <div className="stars flex text-amber-400 gap-1">
      {[1, 2, 3, 4, 5].map((position) => (
        <FontAwesomeIcon
          key={position}
          icon={getStarIcon(position)}
        />
      ))}
    </div>
  );
}