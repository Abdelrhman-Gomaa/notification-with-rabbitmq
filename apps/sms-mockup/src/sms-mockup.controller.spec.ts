import { Test, TestingModule } from '@nestjs/testing';
import { SmsMockupController } from './sms-mockup.controller';
import { SmsMockupService } from './sms-mockup.service';

describe('SmsMockupController', () => {
  let smsMockupController: SmsMockupController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SmsMockupController],
      providers: [SmsMockupService],
    }).compile();

    smsMockupController = app.get<SmsMockupController>(SmsMockupController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(smsMockupController.getHello()).toBe('Hello World!');
    });
  });
});
