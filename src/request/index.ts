import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElLoading, ElMessage } from 'element-plus';


interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  isShowLoading?: boolean;
  isShowError?: boolean; // 错误信息处理
}

const defaultConfig: AxiosRequestConfig = {
  // eslint-disable-next-line no-nested-ternary
  // baseURL: import.meta.env.MODE === 'development' ? '/api1' : 'http://124.222.99.155:8012',
  baseURL: 'http://124.222.99.155:8012',

  headers: {
    'Content-Type': 'application/json'
  },
  validateStatus(status: number) {
    return status >= 200 && status < 400;
  }
};
const LOAD_DEFAULT = true;
class Request {
  public instance: AxiosInstance;

  public loadingInstance: any;

  public isShowLoading = LOAD_DEFAULT;

  constructor(config: CustomAxiosRequestConfig) {
    this.instance = Axios.create(config);
    this.instance.interceptors.request.use((requestConfig) => {
      // console.log(requestConfig.headers)
      // requestConfig.headers.Authorization = localStorage.getItem('token')
      // console.log(config, 'config')
      if (this.isShowLoading) {
        this.loadingInstance = ElLoading.service({
          fullscreen: true,
          text: '加载中',
          background: 'rgba(0, 0, 0, 0.5)'
        });
      }
      return requestConfig;
    });
    this.instance.interceptors.response.use(
      (response) => {
        this.loadingInstance?.close();

        return response;
      },
      (err) => {
        this.loadingInstance?.close();
        return Promise.reject(err);
      }
    );
  }

  request<T>(config: CustomAxiosRequestConfig): Promise<T> {
    if (config.isShowLoading === false) {
      this.isShowLoading = false;
    }
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          this.isShowLoading = LOAD_DEFAULT;
          console.log(res);
          if (res.data) {
            if (res.data.success) {
              resolve(res.data.result);
            }
          }
        })
        .catch((err) => {
          this.isShowLoading = LOAD_DEFAULT;
          ElMessage.error('接口异常');
          reject(err);
        });
    });
  }

  // 约束入参出参类型
  get<T, K>(url: string, data?: T, config?: CustomAxiosRequestConfig): Promise<K> {
    return this.request<K>({ ...config, url, params: data, method: 'GET' });
  }

  post<T, K = any>(url: string, data?: T, config?: CustomAxiosRequestConfig): Promise<K> {
    console.log(import.meta.env.MODE);
    return this.request<K>({ ...config, data, url, method: 'POST' });
  }
}

export default new Request(defaultConfig);