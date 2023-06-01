import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';

interface IFilesServiceUpload {
  files: FileUpload[];
}

@Injectable()
export class FilesService {
  async upload({ files }: IFilesServiceUpload): Promise<string[]> {
    console.log(files);
    const waitedFiles = [];
    waitedFiles[0] = await files[0];
    waitedFiles[1] = await files[1];
    console.log(waitedFiles); // [File, File]
    // 1. 파일을 클라우드 스토리지에 저장하는 로직

    // 1-1) 스토리지 셋팅하기
    const bucket = 'first-side';
    const storage = new Storage({
      projectId: 'backend-388421',
      keyFilename: 'gcp-file-storage.json',
    }).bucket(bucket);

    // 1-2) 스토리지에 파일 올리기

    const results = await Promise.all(
      waitedFiles.map(
        (el) =>
          new Promise<string>((resolve, rejects) => {
            el.createReadStream()
              .pipe(storage.file(el.filename).createWriteStream())
              .on('finish', () => resolve(`${bucket}/${el.filename}`))
              .on('error', () => rejects('파일전송 실패'));
          }),
      ),
    );
    console.log(results);
    return results;
  }
}

// 1개 이미지 업로드 Promise!!
// await new Promise((resolve, reject) => {
//   files
//     .createReadStream()
//     .pipe(storage.file(files.filename).createWriteStream())
//     .on('finish', () => {
//       console.log('파일전송 성공');
//       resolve('성공');
//     })
//     .on('error', () => {
//       console.log('파일전송 실패');
//       reject('실패');
//     });
// });
