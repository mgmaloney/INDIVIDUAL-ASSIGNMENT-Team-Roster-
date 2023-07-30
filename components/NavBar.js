/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { signOut } from '../utils/auth';
import useInterval from '../utils/customHooks/useInterval';

import { useAuth } from '../utils/context/authContext';
import { getUnreadTrades, updateTrade } from '../utils/api/tradeData';

export default function NavBar() {
  const [tradeBadge, setTradeBadge] = useState(0);
  const [unreadTrades, setUnreadTrades] = useState([]);

  const { user } = useAuth();

  const tradeCheck = async () => {
    const unreadTradesIncoming = await getUnreadTrades(user.uid);
    setUnreadTrades(unreadTradesIncoming);
    let unreadTradesNum = 0;
    unreadTrades.forEach(() => {
      // eslint-disable-next-line no-plusplus
      unreadTradesNum++;
    });
    setTradeBadge(unreadTradesNum);
  };

  useEffect(() => {
    tradeCheck();
  }, []);

  useInterval(() => {
    tradeCheck();
  }, 5000);

  const handleTradeNotificationsReset = () => {
    setTradeBadge(0);
    unreadTrades.forEach(async (unreadTrade) => {
      const payload = { firebaseKey: unreadTrade.firebaseKey, read: true };
      await updateTrade(payload);
    });
  };

  return (
    <Navbar
      className="custom-nav"
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
    >
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>Teamster</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}

            <Link passHref href="/">
              <Nav.Link>Teams</Nav.Link>
            </Link>
            <Link passHref href="/myteams">
              <Nav.Link>My Teams</Nav.Link>
            </Link>
            <Link passHref href="/team/new">
              <Nav.Link>Create New Team</Nav.Link>
            </Link>
            <div className="trade-requests-nav">
              <Link passHref href="/mytrades">
                <Nav.Link onClick={handleTradeNotificationsReset}>
                  Trade Requests
                </Nav.Link>
              </Link>
              <p className="trade-badge">{tradeBadge}</p>
            </div>
            <Link passHref href="/trade/new">
              <Nav.Link>Start a Trade Request</Nav.Link>
            </Link>
            <div className="sign-out">
              <Navbar.Text className="signout" onClick={signOut}>
                Sign Out
              </Navbar.Text>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
