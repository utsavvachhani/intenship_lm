import React from 'react';
import { Box, Grid, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const footerSections = [
    {
      title: 'Get to Know Us',
      links: [
        { text: 'About UvMart', path: '/about' },
        { text: 'Careers', path: '/careers' },
        { text: 'Press Releases', path: '/press' }
      ]
    },
    {
      title: 'Connect with Us',
      links: [
        { text: 'Facebook', url: 'https://facebook.com/uvmart' },
        { text: 'Twitter', url: 'https://twitter.com/uvmart' },
        { text: 'Instagram', url: 'https://instagram.com/uvmart' }
      ]
    },
    {
      title: 'Make Money with Us',
      links: [
        { text: 'Sell on UvMart', path: '/sell' },
        { text: 'Protect and Build Your Brand', path: '/brand-protection' },
        { text: 'Become an Affiliate', path: '/affiliate' },
        { text: 'Fulfilment by UvMart', path: '/fulfillment' }
      ]
    },
    {
      title: 'Let Us Help You',
      links: [
        { text: 'Your Account', path: '/account' },
        { text: 'Returns Centre', path: '/returns' },
        { text: 'Recalls and Product Safety Alerts', path: '/safety' },
        { text: '100% Purchase Protection', path: '/protection' },
        { text: 'Help', path: '/help' }
      ]
    }
  ];

  const legalLinks = [
    { text: 'Conditions of Use & Sale', path: '/conditions' },
    { text: 'Privacy Notice', path: '/privacy' },
    { text: 'Interest-Based Ads', path: '/ads' }
  ];

  return (
    <Box 
      component="footer" 
      className="color-baground font-color-primary"
      sx={{
        width: '100%',
        padding: { xs: '20px 16px', md: '40px 32px' },
        marginTop: 'auto',
      }}
    >
      <Box sx={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 3, md: 4 }
      }}>
        {/* Back to top */}
        <Box 
          className="color-navbar"
          sx={{
            padding: '12px 0',
            display: 'flex',
            justifyContent: 'center',
            borderRadius: '4px',
          }}
        >
          <Link 
            component="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-color-primary"
            sx={{
              textDecoration: 'none',
              fontSize: { xs: '0.875rem', md: '1rem' },
              '&:hover': {
                textDecoration: 'underline',
                color : 'white'
              },
            }}
          >
            Back to top
          </Link>
        </Box>

        {/* Main footer content */}
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {footerSections.map((section, index) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={3} 
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1
              }}
            >
              <Typography 
                variant="h6" 
                className="font-color-sigin" 
                sx={{ 
                  fontWeight: 'bold', 
                  fontSize: { xs: '1rem', md: '1.125rem' } 
                }}
              >
                {section.title}
              </Typography>
              <Box 
                component="ul" 
                sx={{ 
                  listStyle: 'none', 
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1
                }}
              >
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.path ? (
                      <Link 
                        component="button"
                        onClick={() => handleNavigation(link.path)}
                        className="font-color-secondary"
                        sx={{
                          textDecoration: 'none',
                          fontSize: { xs: '0.8125rem', md: '0.875rem' },
                          '&:hover': {
                            textDecoration: 'underline',
                            color: 'var(--color-primary)',
                          },
                        }}
                      >
                        {link.text}
                      </Link>
                    ) : (
                      <Link 
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-color-secondary"
                        sx={{
                          textDecoration: 'none',
                          fontSize: { xs: '0.8125rem', md: '0.875rem' },
                          '&:hover': {
                            textDecoration: 'underline',
                            color: 'var(--color-primary)',
                          },
                        }}
                      >
                        {link.text}
                      </Link>
                    )}
                  </li>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Copyright section */}
        <Box 
          sx={{ 
            display: 'flex',
            flexDirection: { xs: 'column-reverse', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            pt: 3,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography 
            variant="caption" 
            className="font-color-thired" 
            sx={{ 
              fontSize: '0.75rem',
              textAlign: { xs: 'center', sm: 'left' }
            }}
          >
            © 2025-{new Date().getFullYear()}, UvMart.com, Inc. or its affiliates
          </Typography>
          <Box 
            sx={{ 
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: { xs: 'center', sm: 'flex-end' },
              gap: { xs: 1.5, sm: 2 },
            }}
          >
            {legalLinks.map((link, index) => (
              <Link 
                key={index}
                component="button"
                onClick={() => handleNavigation(link.path)}
                className="font-color-secondary"
                sx={{
                  textDecoration: 'none',
                  fontSize: '0.75rem',
                  whiteSpace: 'nowrap',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                {link.text}
              </Link>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;