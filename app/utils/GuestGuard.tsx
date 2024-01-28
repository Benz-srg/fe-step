// import PropTypes from 'prop-types';
// import { useEffect } from 'react';
// import { useRouter } from 'next/router';

// // project imports
// import useAuth from 'hooks/useAuth';
// import { DASHBOARD_PATH } from 'config';
// import Loader from 'components/ui-component/Loader';

// // ==============================|| GUEST GUARD ||============================== //

// /**
//  * Guest guard for routes having no auth required
//  * @param {PropTypes.node} children children element/node
//  */

// const GuestGuard = ({ children }) => {
//   const { user, isLoggedIn } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (isLoggedIn) {
//       if (user?.roles?.LOTTO?.canGet) router.push('/lotto/list');
//       else if (user?.roles?.LOTTO_ROUND?.canGet) router.push('/lotto/round');
//       else if (user?.roles?.LOTTO_BET?.canGet) router.push('/lotto/bet');
//       else if (user?.roles?.REPORT?.canGet) router.push('/settings/summary-lotto-type');
//     }
//     // eslint-disable-next-line
//   }, [isLoggedIn]);

//   if (isLoggedIn) return <Loader />;

//   return children;
// };

// GuestGuard.propTypes = {
//   children: PropTypes.node
// };

// export default GuestGuard;
