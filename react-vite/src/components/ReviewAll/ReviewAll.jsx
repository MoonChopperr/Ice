import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkUpdateReview, thunkDeleteReview, thunkIncrementFunny,thunkDecrementFunny, thunkIncrementHelpful, thunkDecrementHelpful, thunkAllGameReviews } from "../../redux/review";
