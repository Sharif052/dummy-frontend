import { Button } from "antd";
import { useEffect } from "react";
import { useNasa } from "../../redux/nasa/action";
import { destroyCookie } from 'nookies';

export default function list() {
    const { isLoading, nasaInfo } = useNasa();
    const { list = [] } = nasaInfo;

    return (<>
        <div className="mt-2 text-right">
            <Button
                type="primary" ghost
                onClick={() => {
                    destroyCookie(null, "token", { path: '/' });
                    destroyCookie(null, "me", { path: '/' });
                    window.location.href = "/";
                }
                }
            >
                LOGOUT
            </Button>
        </div>
        <div className="flex flex-wrap">
            {
                list.map((item: any, index: number) => {
                    return (
                        <div className="w-1/4 p-2">
                            <div className="bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                                <img className="rounded-t-lg" src={item.img_src} alt="" />
                                <div className="p-5">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        {item.earth_date}
                                    </h5>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </>)
};
