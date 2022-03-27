export const AsyncErrors = (theFunc) => (req, res, next) => {
  Promise.resolve(theFunc(req, res, next)).catch(next);
};

// What the above function actually means!! -- its a bit dicey when written as  in an arrow function, but its the syntax
// export function Errors(theFunc (req, res,next)) {}
