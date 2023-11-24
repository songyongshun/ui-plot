syms x_sum y_sum xy_sum x2_sum x3_sum x4_sum x2y_sum;
syms a0 a1 a2;
syms n;
vars=[a0 a1 a2];
eqns=[n*a0+x_sum*a1+x2_sum*a2==y_sum,x_sum*a0+x2_sum*a1+x3_sum*a2==xy_sum,x2_sum*a0+x3_sum*a1+x4_sum*a2==x2y_sum];
solve(eqns,vars)

% -1,1; 0, 1; 1,1;
x_sum=0;
y_sum=3;
xy_sum=0;
x2_sum=2;
x3_sum=0;
x4_sum=2;
x2y_sum=2;
n=3;

a1 =(x2_sum^2*xy_sum + n*x3_sum*x2y_sum - n*x4_sum*xy_sum - x_sum*x2_sum*x2y_sum + x_sum*x4_sum*y_sum - x2_sum*x3_sum*y_sum)/(x4_sum*x_sum^2 - 2*x_sum*x2_sum*x3_sum + x2_sum^3 - n*x4_sum*x2_sum + n*x3_sum^2);

a0=(x2y_sum*x2_sum^2 - xy_sum*x2_sum*x3_sum - x4_sum*y_sum*x2_sum + y_sum*x3_sum^2 - x_sum*x2y_sum*x3_sum + x_sum*x4_sum*xy_sum)/(x4_sum*x_sum^2 - 2*x_sum*x2_sum*x3_sum + x2_sum^3 - n*x4_sum*x2_sum + n*x3_sum^2);

a01=x2y_sum*x2_sum^2 - xy_sum*x2_sum*x3_sum - x4_sum*y_sum*x2_sum + y_sum*x3_sum^2 - x_sum*x2y_sum*x3_sum + x_sum*x4_sum*xy_sum;
a02=x4_sum*x_sum^2 - 2*x_sum*x2_sum*x3_sum + x2_sum^3 - n*x4_sum*x2_sum + n*x3_sum^2;