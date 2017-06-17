// @flow

import type { DeviceKeyObject, IBaseDatabase, IDeviceKeyRepository } from '../types';


// getByID, deleteByID and update uses model.deviceID as ID for querying
class DeviceKeyDatabaseRepository implements IDeviceKeyRepository {
  _database: IBaseDatabase;
  _collectionName: string = 'deviceKeys';

  constructor(database: IBaseDatabase) {
    this._database = database;
  }

  create = async (model: DeviceKeyObject): Promise<DeviceKeyObject> =>
    await this._database.insertOne(
      this._collectionName,
      { _id: model.deviceID, ...model },
    );

  deleteByID = async (deviceID: string): Promise<void> =>
    await this._database.remove(this._collectionName, { deviceID });

  getAll = async (): Promise<Array<DeviceKeyObject>> => {
    throw new Error('The method is not implemented.');
  };

  getByID = async (deviceID: string): Promise<?DeviceKeyObject> =>
    await this._database.findOne(
      this._collectionName,
      { deviceID },
    );

  updateByID = async (
    deviceID: string,
    props: $Shape<DeviceKeyObject>,
  ): Promise<DeviceKeyObject> =>
    await this._database.findAndModify(
      this._collectionName,
      { deviceID },
      null,
      { $set: { ...props } },
      { new: true, upsert: true },
    );
}

export default DeviceKeyDatabaseRepository;