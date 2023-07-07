import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { getToday } from 'src/commons/libraries/utils';
import { v4 as uuidv4 } from 'uuid';

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
    const bucket = process.env.GCP_BUCKET_NAME;
    const storage = new Storage({
      projectId: process.env.GCP_PROJECT_ID,
      keyFilename: process.env.GCP_KEY_FILE,
    }).bucket(bucket);

    // 1-2) 스토리지에 파일 올리기

    const results = await Promise.all(
      waitedFiles.map(
        (el) =>
          new Promise<string>((resolve, rejects) => {
            const fileName = `${getToday()}/${uuidv4()}/origin/${el.filename}`;
            el.createReadStream()
              .pipe(storage.file(fileName).createWriteStream())
              .on('finish', () => resolve(`${bucket}/${fileName}`))
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
