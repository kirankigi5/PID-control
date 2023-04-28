#include <iostream>

int gcd(int a, int h)
{
    int temp;
    while (1)
    {
        temp = a%h;
        if ( temp == 0)
        {
          return h;
        }
        a = h;
        h = temp;
    }
}
float encrpyt(float speed)
{
    double prime1=3;
    double prime2=7;
    double n = prime1*prime2;
    double e = 2;
    double phi = (prime1-1)*(prime2-1);
    while (e < phi)
    {
        if (gcd(e, phi)==1)
        {
            break;
        }
        else
        {
            e++;
        }
    }
    int k = 2; 
    double d = (1 + (k*phi))/e;
    double em=1;
    for(int i=0;i<e;i++)
    {
        em = ((((long long)em)%((long long)n))*( ((long long)speed)%((long long)n) ))%(long long)n;
    }
    return em;
}

