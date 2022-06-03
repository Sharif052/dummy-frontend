import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_NASE } from "../types";

interface IRootState {
  nasaImageReducer: {
    list: [];
  };
}

export const useNasa = () => {
  const dispatch = useDispatch();
  const nasaInfo: any = useSelector<IRootState>((state) => state.nasaImageReducer);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getNasaImage = async () => {
    setIsLoading(true)
    try {
      let response: any = await fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=qaVjxxEU5nEeYsXEb4OgQl80ZCbz75h7coHCxsQc')
      response = await response.json();

      if (response?.photos) {
        dispatch({
          type: SAVE_NASE,
          payload: response.photos,
        });
      }
      else {
        dispatch({
          type: SAVE_NASE,
          payload: [],
        });
      }

    } catch (error) {

    }
    finally {
      setIsLoading(false)
    }

  };
  return { getNasaImage, isLoading, nasaInfo };
};
