'use client';
import React from 'react';
import { Box, Typography, LinearProgress, Tooltip } from '@mui/material';
import { IBook } from 'types/book';

interface RatingsSlidersProps {
  book: IBook; // Accept the IBook object as a prop
}

const RatingsSliders: React.FC<RatingsSlidersProps> = ({ book }) => {
  const { ratings } = book;

  // Calculate the percentage of each rating
  const ratingPercentage = (ratingCount: number) => {
    return ratings.count ? (ratingCount / ratings.count) * 100 : 0;
  };

  return (
    <Box>
      <Typography variant="h6">
        <b>Ratings by Stars</b>:
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <Typography variant="body1" sx={{ marginRight: '10px' }}>
            5 Star
          </Typography>
          <Box sx={{ flex: 1 }}>
            <Tooltip title={`Total Ratings: ${ratings.rating_5}`} placement="top">
              <LinearProgress
                variant="determinate"
                value={ratingPercentage(ratings.rating_5)}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#f4b400'
                  }
                }}
              />
            </Tooltip>
          </Box>
          <Typography variant="body2" sx={{ marginLeft: '10px' }}>
            {ratingPercentage(ratings.rating_5).toFixed(0)}%
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <Typography variant="body1" sx={{ marginRight: '10px' }}>
            4 Star
          </Typography>
          <Box sx={{ flex: 1 }}>
            <Tooltip title={`Total Ratings: ${ratings.rating_4}`} placement="top">
              <LinearProgress
                variant="determinate"
                value={ratingPercentage(ratings.rating_4)}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#f4b400'
                  }
                }}
              />
            </Tooltip>
          </Box>
          <Typography variant="body2" sx={{ marginLeft: '10px' }}>
            {ratingPercentage(ratings.rating_4).toFixed(0)}%
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <Typography variant="body1" sx={{ marginRight: '10px' }}>
            3 Star
          </Typography>
          <Box sx={{ flex: 1 }}>
            <Tooltip title={`Total Ratings: ${ratings.rating_3}`} placement="top">
              <LinearProgress
                variant="determinate"
                value={ratingPercentage(ratings.rating_3)}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#f4b400'
                  }
                }}
              />
            </Tooltip>
          </Box>
          <Typography variant="body2" sx={{ marginLeft: '10px' }}>
            {ratingPercentage(ratings.rating_3).toFixed(0)}%
          </Typography>
        </Box>

        {/* Rating 2 */}
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <Typography variant="body1" sx={{ marginRight: '10px' }}>
            2 Star
          </Typography>
          <Box sx={{ flex: 1 }}>
            <Tooltip title={`Total Ratings: ${ratings.rating_2}`} placement="top">
              <LinearProgress
                variant="determinate"
                value={ratingPercentage(ratings.rating_2)}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#f4b400'
                  }
                }}
              />
            </Tooltip>
          </Box>
          <Typography variant="body2" sx={{ marginLeft: '10px' }}>
            {ratingPercentage(ratings.rating_2).toFixed(0)}%
          </Typography>
        </Box>

        {/* Rating 1 */}
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <Typography variant="body1" sx={{ marginRight: '10px' }}>
            1 Star
          </Typography>
          <Box sx={{ flex: 1 }}>
            <Tooltip title={`Total Ratings: ${ratings.rating_1}`} placement="top">
              <LinearProgress
                variant="determinate"
                value={ratingPercentage(ratings.rating_1)}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#f4b400'
                  }
                }}
              />
            </Tooltip>
          </Box>
          <Typography variant="body2" sx={{ marginLeft: '10px' }}>
            {ratingPercentage(ratings.rating_1).toFixed(0)}%
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default RatingsSliders;
