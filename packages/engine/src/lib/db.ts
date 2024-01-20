import { DataTypes, Sequelize, type Optional, Model, type InferAttributes, type InferCreationAttributes, type CreationOptional } from 'sequelize'
import type { RssParsed } from './types'
import type { TriggerConfig } from '@/foundations/trigger-runtime'

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db.sqlite',
  sync: { force: true },
  logging: false
})


// BOT
export class Bot extends Model<InferAttributes<Bot>, InferCreationAttributes<Bot>> {
  declare id: CreationOptional<number>
  declare name: string
  declare service: 'twitter' | 'telegram'

  declare config: {
    telegram?: {
      botApiToken?: string
      session?: string
      apiId?: number
      apiHash?: string
    }
    twitter?: {
      apiKey?: string
      apiSecret?: string
      bearerToken?: string
      accessToken?: string
      accessTokenSecret?: string
      clientId?: string
      clientSecret?: string
    }
  }
}
Bot.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  service: {
    // enum : ['twitter', 'telegram']
    type: DataTypes.ENUM('twitter', 'telegram'),
    allowNull: false,
  },
  config: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: {}
  }
}, {
  sequelize,
  timestamps: true,
});


// TRIGGER
export class Trigger extends Model<InferAttributes<Trigger>, InferCreationAttributes<Trigger>> {
  declare id: CreationOptional<number>
  declare name: string
  declare config: TriggerConfig

  // declare addBot: (bot: Bot|Bot[]) => Promise<void>
  // declare setBots: (bot: Bot|Bot[]) => Promise<void>
}
Trigger.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  config: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: {}
  }
}, {
  sequelize,
  timestamps: true
});


// // TRIGGERS_BOTS (MANY TO MANY)
// export class TriggerBot extends Model<InferAttributes<TriggerBot>, InferCreationAttributes<TriggerBot>> {
//   declare id: CreationOptional<number>
//   declare triggerId: number
//   declare botId: number
// }
// TriggerBot.init({
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   triggerId: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },
//   botId: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },
// }, {
//   sequelize,
//   timestamps: true
// });
// TriggerBot.belongsTo(Trigger, { foreignKey: 'triggerId', onDelete: 'CASCADE' });
// TriggerBot.belongsTo(Bot, { foreignKey: 'botId', onDelete: 'CASCADE' });
// Trigger.belongsToMany(Bot, { through: TriggerBot, foreignKey: 'triggerId' });
// Bot.belongsToMany(Trigger, { through: TriggerBot, foreignKey: 'botId' });


// FEEDS
export class Feed extends Model<InferAttributes<Feed>, InferCreationAttributes<Feed>> {
  declare id: CreationOptional<number>
  declare name: string
  declare url: string

  declare config: {
    maxItemGet: number
    forceSameItem: boolean
  }

  declare addTrigger: (trigger: Trigger|Trigger[]) => Promise<void>
  declare setTriggers: (trigger: Trigger|Trigger[]) => Promise<void>
  declare addHistory: (history: FeedHistory|FeedHistory[]) => Promise<void>
}
Feed.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  config: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: {
      maxItemGet: 10,
      forceSameItem: false
    }
  }
}, {
  sequelize,
  timestamps: true
});


// FEEDS_TRIGGERS (MANY TO MANY)
export class FeedTrigger extends Model<InferAttributes<FeedTrigger>, InferCreationAttributes<FeedTrigger>> {
  declare id: CreationOptional<number>
  declare feedId: number
  declare triggerId: number
}
FeedTrigger.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  feedId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  triggerId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  sequelize,
  timestamps: true
});
FeedTrigger.belongsTo(Feed, { foreignKey: 'feedId', onDelete: 'CASCADE' });
FeedTrigger.belongsTo(Trigger, { foreignKey: 'triggerId', onDelete: 'CASCADE' });
Trigger.belongsToMany(Feed, { through: FeedTrigger, foreignKey: 'triggerId' });
Feed.belongsToMany(Trigger, { through: FeedTrigger, foreignKey: 'feedId' });




// FEEDS_HISTORY
export class FeedHistory extends Model<InferAttributes<FeedHistory>, InferCreationAttributes<FeedHistory>> {
  declare id: CreationOptional<number>
  declare feedId: number
  declare date: Date
  declare itemsCount: number
  declare status: 'pending' | 'success' | 'failed'
  declare itemsProcessed: number
  declare logs: string
  
  declare rssUrl: string
  declare rssParsedRaw: RssParsed
}
FeedHistory.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  feedId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('success', 'failed', 'pending'),
    allowNull: false,
    defaultValue: 'pending'
  },
  itemsProcessed: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  itemsCount: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  rssUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  rssParsedRaw: {
    type: DataTypes.JSON,
    allowNull: true
  },
  logs: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true
});
FeedHistory.belongsTo(Feed, { foreignKey: 'feedId', onDelete: 'CASCADE' });
Feed.hasMany(FeedHistory, { foreignKey: 'feedId', onDelete: 'CASCADE' });


// FEEDS_ITEMS
export class FeedItem extends Model<InferAttributes<FeedItem>, InferCreationAttributes<FeedItem>> {
  declare id: CreationOptional<number>
  declare feedHistoryId: number

  // main
  declare url: string
  declare rssItem: RssParsed['items']

  // content parsed
  declare title: CreationOptional<string>
  declare byline: CreationOptional<string>
  declare dir: CreationOptional<string>
  declare lang: CreationOptional<string>
  declare content: CreationOptional<string>
  declare textContent: CreationOptional<string>
  declare contentLength: CreationOptional<number>
  declare excerpt: CreationOptional<string>
  declare siteName: CreationOptional<string>
}
FeedItem.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  feedHistoryId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rssItem: {
    type: DataTypes.JSON,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true
  },
  byline: {
    type: DataTypes.STRING,
    allowNull: true
  },
  dir: {
    type: DataTypes.STRING,
    allowNull: true
  },
  lang: {
    type: DataTypes.STRING,
    allowNull: true
  },
  content: {
    type: DataTypes.STRING,
    allowNull: true
  },
  textContent: {
    type: DataTypes.STRING,
    allowNull: true
  },
  contentLength: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  excerpt: {
    type: DataTypes.STRING,
    allowNull: true
  },
  siteName: {
    type: DataTypes.STRING,
    allowNull: true
  },
}, {
  sequelize,
  timestamps: true
});
FeedItem.belongsTo(FeedHistory, { foreignKey: 'feedHistoryId', onDelete: 'CASCADE' });
FeedHistory.hasMany(FeedItem, { foreignKey: 'feedHistoryId', onDelete: 'CASCADE' });




// TRIGGER_HISTORY
export class TriggerHistory extends Model<InferAttributes<TriggerHistory>, InferCreationAttributes<TriggerHistory>> {
  declare id: CreationOptional<number>
  declare triggerId: number
  declare feedHistoryId: number
  declare feedItemId: number
  declare status: 'pending' | 'success' | 'failed'
  declare logs: string

  declare addFeedHistory: (feedHistory: FeedHistory|FeedHistory[]) => Promise<void>
  declare addFeedItem: (feedItem: FeedItem|FeedItem[]) => Promise<void>
  declare addTrigger: (trigger: Trigger|Trigger[]) => Promise<void>
}
TriggerHistory.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  triggerId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  feedHistoryId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  feedItemId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('success', 'failed', 'pending'),
    allowNull: false,
    defaultValue: 'pending'
  },
  logs: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true
});
TriggerHistory.belongsTo(Trigger, { foreignKey: 'triggerId', onDelete: 'CASCADE' });
Trigger.hasMany(TriggerHistory, { foreignKey: 'triggerId', onDelete: 'CASCADE' });
TriggerHistory.belongsTo(FeedHistory, { foreignKey: 'feedHistoryId', onDelete: 'CASCADE' });
FeedHistory.hasMany(TriggerHistory, { foreignKey: 'feedHistoryId', onDelete: 'CASCADE' });
TriggerHistory.belongsTo(FeedItem, { foreignKey: 'feedItemId', onDelete: 'CASCADE' });
FeedItem.hasMany(TriggerHistory, { foreignKey: 'feedItemId', onDelete: 'CASCADE' });