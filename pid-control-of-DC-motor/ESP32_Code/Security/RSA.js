const tmp = response.data["feeds"];
                const fieldVal = tmp[tmp.length - 1]["field1"];
                let p =3
                let q= 7
                let n = p*q;
                let e = 2;
                let phi = (p-1)*(q-1);
                while (e < phi)
                {
                    if (gcd(e, phi)==1)
                        break;
                    else
                        e++;
                }
                let k = 2;  // A constant value
                let d= (1 + (k*phi))/e;
                let dm=1;
                for(let i=0;i<e;i++)
                {
                    em = ((dm%n)*(fieldVal%n))%n;
                }
                fieldVal = dm;